import Menu from "./components/menu";

export default function layout({ children }) {
  return (
    <div>
      <Menu />
      {children}
    </div>
  );
}
