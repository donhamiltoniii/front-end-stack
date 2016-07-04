import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getJoke } from '../actions';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

// 1. When "Get Joke" button is pressed, show spinner.
// 2. When result is shown, remove spinner.
// 3. If API call fails, display error message. Otherwise, display joke.
const GetJoke = ({ joke, error, completed, onClick }) => {
  const spinner = !completed ? <div><CircularProgress size="0.5" /></div> : undefined;
  const errorMessage = error ? <div>An error has occurred: {error}</div> : undefined;

  // noinspection HtmlUnknownAttribute
  return (
    <div>
      <RaisedButton primary label="Get Joke" onClick={onClick} />
      {spinner}
      <h2><span dangerouslySetInnerHTML={{ __html: joke }} /></h2>
      {errorMessage}
    </div>
  );
};

GetJoke.propTypes = {
  joke: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  joke: state.joke.get('joke'),
  error: state.joke.get('error'),
  completed: state.joke.get('completed')
});

export default connect(mapStateToProps, { onClick: getJoke })(GetJoke);
