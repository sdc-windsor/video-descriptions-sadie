function validateComment(video_id, user_id, comment) {

  if (isNaN(video_id) || isNaN(user_id) || (comment.length > 700)) {
    return false;
  }

  return true;

}

module.exports = {validateComment};