import { Navbar } from "@nextui-org/react";
import { AdminPages } from "../const/const";

type NavBarProps = {
  page: AdminPages
};

const CustomNavBar: React.FC<NavBarProps> = (props) => {
  const page = props.page
  return (
    <Navbar>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href={page == "home" ? undefined : "/"} isActive={page == "home"}>Home</Navbar.Link>
        <Navbar.Link href={page == "users" ? undefined : "/users"} isActive={page == "users"}>Users</Navbar.Link>
      </Navbar.Content>
    </Navbar >
  )
}

export default CustomNavBar
