function updateTrack(id) {
  $.ajax({
    url: '/race/ut' + id,
    type: 'PUT',
    data: $('#update_track').serialize(),
    success: function(result) {
      window.location.replace("./");
    }
  })
};
