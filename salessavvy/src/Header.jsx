const Header = ({ cartCount = 0, username = "Guest" }) => {
  return (
    <header className="header">
      <div className="header-content">
        <Logo />

        <div className="header-actions">
          <CartIcon count={cartCount} />
          <ProfileDropDown username={username} />
        </div>
      </div>
    </header>
  );
};
