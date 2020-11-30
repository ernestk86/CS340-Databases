function deleteRace(id){
    $.ajax({
        url: '/race/dr' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteRaceDriver(rid, did){
  $.ajax({
      url: '/race/race/' + rid + '/driver/' + did,
      type: 'DELETE',
      success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
};

function deleteTrack(id){
    $.ajax({
        url: '/race/t' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteDriver(id){
    $.ajax({
        url: '/driver/dd' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteTeam(id){
    $.ajax({
        url: '/driver/dt' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteVehicle(id){
    $.ajax({
        url: '/driver/dv' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
