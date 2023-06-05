export interface IAuthorization {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface INav {
  onClick: () => void;
}
