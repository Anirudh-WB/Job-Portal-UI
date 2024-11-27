interface CustomAction {
    label: string;
    icon?: React.ReactNode;
    callback: (id: string | number) => void;
}

export default CustomAction;