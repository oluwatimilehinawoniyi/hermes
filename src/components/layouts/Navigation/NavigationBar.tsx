import Button from "@components/UI/Button/Button";
import Logo from "@components/UI/Logo/Logo";

export default function NavigationBar() {
  return (
    <nav>
      <div>
        <Logo />
        <h1>| internal</h1>
      </div>

      <div>
        <Button>login</Button>
      </div>
    </nav>
  );
}
