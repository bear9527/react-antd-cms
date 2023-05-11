import { Link,useParams } from "react-router-dom";

const About = () => {
  const params = useParams()
  console.log("About",params);
  return (
    <div>
      About id: {params.id}
      <Link to={"/home?id=7890"}>home</Link>
    </div>
  );
};
export default About;
