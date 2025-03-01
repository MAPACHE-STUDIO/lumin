import PropTypes from "prop-types";

export const FormLayout = ({ form }) => {
  return (
    <div className="flex h-screen bg-white justify-center items-center		">
      <div className="w-full flex justify-center items-center ">{form}</div>
    </div>
  );
};
FormLayout.propTypes = {
  form: PropTypes.node.isRequired,
};