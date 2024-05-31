import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      // onNavigate possui uma prop interna chamada "location" com dados do redirecionamento. Podemos extrair as props que queremos dela
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location; //o caminho atual do container

        if (pathname !== nextPathname) {
          //nextPathname é o que vem dos remotes
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
