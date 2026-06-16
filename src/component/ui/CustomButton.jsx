import { Button } from "antd";

const CustomButton = ({ value, onclick, className ,type,disable}) => {
  return (
    <div>
      <Button
         disabled={disable??false}
        className={`${className}    font-semibold    !border-none !text-[#fff] hover:!text-[#fff] !bg-[#452E5A] hover:!text-[#000000] ${className}`}
        onClick={onclick}
        type={type}
      >
        {value}
      </Button>
    </div>
  );
};
export default CustomButton;
