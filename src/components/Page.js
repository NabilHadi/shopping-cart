const Page = ({ children, classname, id }) => {
  return (
    <main id={id} className={"bg-white " + (classname ? classname : "")}>
      {children}
    </main>
  );
};

export default Page;
