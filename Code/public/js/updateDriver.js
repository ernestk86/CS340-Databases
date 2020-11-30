function updateDriver(id) {
  $.ajax({
    url: '/driver/ud' + id,
    type: 'PUT',
    data: $('#update_driver').serialize(),
    success: function(result) {
      window.location.replace("./");
    }
  })
};
