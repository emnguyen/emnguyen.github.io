/*
 * Project pages
 */

var data = require("../data.json");

exports.view = function(req, res) {
  var inputTitle = req.params.title;

  // Redirect to resume
  if (inputTitle == "resume") {
    res.redirect(
      "https://drive.google.com/file/d/0B6dEoGhrXuYId0g0Nm5BR1ZYbTg/view"
    );
    return;
  }

  // Check if valid project url
  var projects = data.projects;

  for (var i = 0; i < projects.length; i++) {
    var currProject = projects[i];

    // Render project page if input title matches a project
    if (inputTitle == currProject.url) {

      // Redirect to archive if necessary
      if (currProject.archive) {
        res.redirect('/archive/' + currProject.url);
        return;
      }

      res.render("project", {
        data,
        currProject,
        title: currProject.title + " | Emily Nguyen",
        description: currProject.description,
        icon: currProject.icon 
      });
      return;
    }
  }

  // Otherwise, show 404
  res.render("404", {
    data,
    title: "Page Not Found | Emily Nguyen"
  });
};

exports.viewArchive = function(req, res) {
  var inputTitle = req.params.title;

  // Check if valid project url
  var projects = data.projects;

  for (var i = 0; i < projects.length; i++) {
    var currProject = projects[i];

    // Render project page if input title matches a project
    if (inputTitle == currProject.url) {

      // Redirect to index if necessary
      if (!currProject.archive) {
        res.redirect('/' + currProject.url);
        return;
      }

      res.render("project", {
        data,
        currProject,
        title: currProject.title + " | Emily Nguyen",
        description: currProject.description,
        icon: currProject.icon 
      });
      return;
    }
  }

  // Otherwise, show 404
  res.render("404", {
    data,
    title: "Page Not Found | Emily Nguyen"
  });
};
