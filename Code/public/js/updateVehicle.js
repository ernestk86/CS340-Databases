function updateVehicle(id) {
  $.ajax({
    url: '/driver/uv' + id,
    type: 'PUT',
    data: $('#update_vehicle').serialize(),
    success: function(result) {
      window.location.replace("./");
    }
  })
};
