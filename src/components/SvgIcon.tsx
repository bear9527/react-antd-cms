import Icon from "@ant-design/icons";
import { FC } from "react";
import svgMap from "../assets/icons";
interface IPorp {
  iconName: string;
  className?: string;
}
const SvgIcon: FC<IPorp> = ({ iconName, className }) => {
  return (
    <>
      <Icon component={svgMap[iconName]} className={className}></Icon>
    </>
  );
};
export default SvgIcon;
