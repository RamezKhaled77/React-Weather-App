import UnitsDropdownMenu from "./UnitsDropdownMenu";
export default function Header({
  isImperial,
  handleSwitch,
  unitsIsOpen,
  toggleMenu,
}) {
  return (
    <header>
      <img className="logo" src="./assets/images/logo.svg" alt="" />

      <UnitsDropdownMenu
        isImperial={isImperial}
        handleSwitch={handleSwitch}
        toggleMenu={toggleMenu}
        unitsIsOpen={unitsIsOpen}
      />
    </header>
  );
}
