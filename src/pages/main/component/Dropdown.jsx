const Dropdown = (props) => {
  return (
    <div>
      <article>{props.visibility && props.children}</article>
    </div>
  );
};

export default Dropdown;
