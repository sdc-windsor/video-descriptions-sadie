function validateComment(video_id, user_id, comment) {

  if (isNaN(video_id) | isNaN(user_id) | (comment.length > 700)) {
    return false;
  }

  return true;

}

function arrayContainsArray(superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return (superset.includes(value));
  });
}

function validateDescription(video_id, description, categories) {
  const possibleCategories = [
    'Animation', 'Comedy', 'Music', 'Education', 'Art & Design',
    'Documentary', 'Food', 'Fashion', 'Travel', 'Journalism'
  ];

  if (
    isNaN(video_id) |
    description.length > 1000 |
    !arrayContainsArray(possibleCategories, categories)
  ) {
    return false;
  }

  return true

}

module.exports = { validateComment, validateDescription };