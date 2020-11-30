function updateTeam(id) {
  $.ajax({
    url: '/driver/ut' + id,
    type: 'PUT',
    data: $('#update_team').serialize(),
    success: function(result) {
      window.location.replace("./");
    }
  })
};
