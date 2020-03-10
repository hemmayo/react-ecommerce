import React from "react";
import { connect } from "react-redux";
import MenuItem from "../menu-item/menu-item.component";

import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selectors";

// import "./directory.styles.scss";
import { DirectoryMenu } from "./directory.styles";

const Directory = ({ sections }) => {
  return (
    <DirectoryMenu>
      {sections &&
        sections.map(({ id, ...otherProps }) => (
          <MenuItem key={id} {...otherProps} />
        ))}
    </DirectoryMenu>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
