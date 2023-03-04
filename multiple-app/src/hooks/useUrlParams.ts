import { useSearchParams } from 'react-router-dom';

import { TURLParams } from '../redux/slices/news/types';

interface IUrlParamsConfig {
  initialParams?: TURLParams;
  isReplace?: boolean;
}

export const useUrlParams = <T extends IUrlParamsConfig>(
  config: T,
): [
  TURLParams,
  {
    setParams: (paramName: string, value: string | undefined) => void;
    updateParams: (paramName: string, value: string | undefined) => void;
    removeParams: (paramName: string) => void;
  },
] => {
  const [searchParams, setSearchParams] = useSearchParams(config.initialParams);

  const setParams = (paramName: string, value = '', isReplace?: boolean) => {
    setSearchParams(
      { [paramName]: value },
      { replace: isReplace || config.isReplace },
    );
  };

  const updateParams = (paramName: string, value = '') => {
    searchParams.append(paramName, value);
  };

  const removeParams = (paramName: string) => {
    searchParams.delete(paramName);
  };

  return [
    Object.fromEntries([...searchParams]) as TURLParams,
    { setParams, updateParams, removeParams },
  ];
};
