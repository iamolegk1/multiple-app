import { FC, PropsWithChildren, useState, useEffect } from 'react';

interface ITemporaryComponentProps {
  delayTime: number;
  defaultIsShowValue?: boolean;
  callback?: (params?: unknown) => unknown | void;
}

const TemporaryComponent: FC<PropsWithChildren<ITemporaryComponentProps>> = ({
  delayTime,
  defaultIsShowValue = true,
  callback = () => {},
  children,
}) => {
  const [isShowComponent, setIsShowComponent] =
    useState<boolean>(defaultIsShowValue);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsShowComponent(prevState => !prevState);
      callback();
    }, delayTime);
    return () => clearTimeout(delay);
  }, [delayTime, callback]);

  return <>{isShowComponent && children}</>;
};

export default TemporaryComponent;
