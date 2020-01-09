import React from "react";

import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import "./collection.styles.scss";

const CollectionPage = ({ collection: { items, title } }) => (
  <div className="collection">
    <CollectionPreview title={title} items={items} length={items.length} />
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
