$(document).ready(function() {
    $.fn.editable.defaults.mode = "popup";
    $(".editable").editable({
      disabled: true,
      placement: "bottom"
    });
});

$('#toggle-editing').click(function(e) {
    $(".editable").editable("toggleDisabled");
});

function getCurrentLeaders() {
  var currentLeaders = $("#leader-ids").val();
  if (currentLeaders) {
    return currentLeaders.split(",");
  } else {
    return [];
  }
}

function updateLeaderList(currentLeaders) {
  leaderHtml = "";
  for (var i = 0; i < currentLeaders.length; i++) {
    leaderHtml += "<div class='alert alert-info'><a class='close' onclick='removeLeader(" + i + ")'>×</a>" +
        leaderNames[currentLeaders[i]] + "</div>";
  }
  $("#leaders").html(leaderHtml);
}

function removeLeader(index) {
  var currentLeaders = getCurrentLeaders();
  currentLeaders.splice(index, 1);
  $("#leader-ids").val(currentLeaders.join());
  updateLeaderList(currentLeaders);
}

$(function() {
  $("#leader-list").typeahead({
    source: leaders,
    updater: function(item) {
      var currentLeaders = getCurrentLeaders();
      currentLeaders.push(leaderIds[item]);
      $("#leader-ids").val(currentLeaders.join());
      updateLeaderList(currentLeaders);
      return "";
    }
  });
  $("#leader-list").keypress(function(e) {
    // Disable the enter key from doing anything when no leader is selected.
    if (e.which == 13) {
      return false;
    }
  });

  var currentLeaders = getCurrentLeaders();
  if (currentLeaders) {
    updateLeaderList(currentLeaders);
  }

  $(".datepicker").datepicker();

  $("#due-date").ready(function(event) {
    var nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    var year = nextWeek.getFullYear();
    var month = nextWeek.getMonth() + 1;
    var day = nextWeek.getDate();

    if (month.toString().length < 2) {
      month = "0" + month.toString();
    }
    if (day.toString().length < 2) {
      day = "0" + month.toString();
    }

    $("#due-date").val(year + "-" + month + "-" + day);
  });
});
