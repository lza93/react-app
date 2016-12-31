import React, { PropTypes } from 'react';

const InfoParagraph = ({ content, horizontalInfoStyle, paragraphInfoStyle }) => (
  <div className="horizontal-info paragraph-info" style={horizontalInfoStyle}>
    <p className="paragraph-info text-left" style={paragraphInfoStyle}>{content}</p>
  </div>
);

export default InfoParagraph;

export const renderParagraphs = (content, horizontalInfoStyle, paragraphInfoStyle) => content.split('\n')
  .map((pContent, index) =>
    <InfoParagraph
      content={pContent}
      horizontalInfoStyle={horizontalInfoStyle}
      paragraphInfoStyle={paragraphInfoStyle}
      key={index}
    />);


InfoParagraph.propTypes = {
  content: PropTypes.string,
  horizontalInfoStyle: PropTypes.objectOf(PropTypes.string),
  paragraphInfoStyle: PropTypes.objectOf(PropTypes.string),
};
