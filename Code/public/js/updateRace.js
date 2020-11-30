function updateRace(id) {
  $.ajax({
    url: '/race/ur' + id,
    type: 'PUT',
    data: $('#update_race').serialize(),
    success: function(result) {
      window.location.replace("./");
    }
  })
};
