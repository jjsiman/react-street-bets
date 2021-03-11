import React, { useState } from 'react';
import Button from '../Button/Button';

type ReadMoreTextProps = {
  text: string;
  displayLimit: number;
}

const ReadMoreText = (props: ReadMoreTextProps) => {

  const [showText, setShowText] = useState(false);

  // eslint-disable-next-line no-useless-escape
  const sentences = props.text.match(/[^.\!\?]+[.\!\?]+/g) || [];
  const numberOfSentences = sentences.length;

  const starterText = sentences.slice(0, props.displayLimit).join(' ');

  let isLong = null;
  if (numberOfSentences && numberOfSentences > props.displayLimit) {
    isLong = (
      <React.Fragment>
        <span style={{ display: showText ? 'inline' : 'none' }} >
          {sentences.slice(props.displayLimit).join(' ')}
        </span>
        <Button onClick={() => setShowText(!showText)}>Read {showText ? 'Less' : 'More'}</Button>
      </React.Fragment>
    )
  }

  return (
    <div>
      <p>
        <span>
          {starterText}
        </span>
        {isLong}
      </p>
    </div>
  )
}

ReadMoreText.defaultProps = {
  text: 'No description available',
  displayLimit: 2
}

export default ReadMoreText;