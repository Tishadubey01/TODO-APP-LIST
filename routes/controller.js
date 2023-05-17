const Task = require('../models/task');
//
exports.create=(req,res)=>{
    const {title,priority}=req.body;
    if(priority<1 || priority>=10){
        return res.status(400).json({error:'Priority must be between 1 and 9'});
    }

        const tasks = new Task({
            title:req.body.title,
            priority:req.body.priority,
            completed: false,
            canceled: false

            
        });
        tasks.save()

        .then(data => {
            res.send(data);
        }
        )
        .catch(error => {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the Task."
            });
        }
        );
    }
    exports.findAll = (req, res) => {
        Task.find({deleted:{ $ne: true }})
        .sort({priority:1})
            .then(tasks => {
                const formattedTasks = tasks.map((task,index) => {
                    let taskStatus='[]';
                    if(task.completed){
                        taskStatus='[✔]';
                    }else if(task.canceled){
                        taskStatus='[✘]';
                    }
                    //const taskStatus=task.completed ?'[x]': task.canceled?'[ ]':'[ ]';
                    return `${index+1}. ${task.title} ${task.priority} ${taskStatus}`;
                });

                res.send(formattedTasks);
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message || "Some error occurred while retrieving tasks."
                });
            });
    }
    exports.find = (req, res) => {
       Task.find({deleted:{ $ne: true }})
            .then(tasks => {
                res.send(tasks);
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message || "Some error occurred while retrieving tasks."
                });
            });
    }

    exports.findOne = (req, res) => {
        const id = req.params.id;
        Task.findById(id)
            .then(tasks => {
                if (!tasks) {
                    return res.status(404).send({
                        message: "Task not found with id " + id
                    });
                }
                res.send(tasks);
            })
            .catch(error => {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Task not found with id " + id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving task with id " + id
                });
            });
    }
    exports.completed = (req, res) => {
        const id = req.params.id;
        Task.findByIdAndUpdate(id, { completed: true }, { new: true })
            .then(tasks => {
                if (!tasks) {
                    return res.status(404).send({
                        message: "Task not found with id " + id
                    });
                }
                res.send(tasks);
            })
            .catch(error => {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Task not found with id " + id
                    });
                }
                return res.status(500).send({
                    message: "Error updating task with id " + id
                });
            });
    }
    exports.canceled = (req, res) => {
        const id = req.params.id;
        Task.findByIdAndUpdate(id, { canceled: true }, { new: true })
            .then(tasks => {
                if (!tasks) {
                    return res.status(404).send({
                        message: "Task not found with id " + id
                    });
                }
                res.send(tasks);
            })
            .catch(error => {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Task not found with id " + id
                    });
                }
                return res.status(500).send({
                    message: "Error updating task with id " + id
                });
            });
    }
    exports.deleted = (req, res) => {
        const id = req.params.id;
        Task.findByIdAndUpdate(id, { deleted: true }, { new: true })
            .then(tasks => {
                if (!tasks) {
                    return res.status(404).send({
                        message: "Task not found with id " + id
                    });
                }
                res.send('Task deleted successfully!');
            })
            .catch(error => {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Task not found with id " + id
                    });
                }

                return res.status(500).send({
                    message: "Error updating task with id " + id
                });
            });
    }

    // exports.deleted = (req, res) => {
    //     const id = req.params.id;
    //     Task.findByIdAndRemove(id)
    //         .then(tasks => {
    //             if (!tasks) {
    //                 return res.status(404).send({
    //                     message: "Task not found with id " + id
    //                 });
    //             }
    //             Task.countDocuments({ isDeleted: true })
    //                 .then(count => {
    //                     const tasks=count;
    //             res.send({ message: "Task deleted successfully!",tasks:tasks });
    //         })
    //         .catch(error => {
                
    //             return res.status(500).send({
    //                 message: "Could not delete task with id " + id
    //             });
    //         });
    // })
    // .catch(error => {
    //     if (error.kind === 'ObjectId' || error.name === 'NotFound') {
    //         return res.status(404).send({
    //             message: "Task not found with id " + id
    //         });
    //     }
    //     return res.status(500).send({
    //         message: "Could not delete task with id " + id
    //     });
    // });

    // }
    
    // exports.getcount = (req, res) => {
    //     Task.count({})
    //         .then(tasks => {
    //             Task.count({ completed: false,canceled:false })
    //             .then(tasks1 => {
    //                 Task.count({ completed: true,canceled:false })
    //                 .then(tasks2 => {
    //                     Task.count({ canceled: true })
    //                     .then(tasks3 => {
    //                         res.send({total:tasks,active:tasks1,completed:tasks2,canceled:tasks3});
    //                     })
    //                 })
    //             }
    //             )
    //         })
    //         .catch(error => {
    //             res.status(500).send({
    //                 message: error.message || "Some error occurred while retrieving tasks."
    //             });
    //         }
    //         );
    // }

    exports.getcount = (req, res) => {
        Task.count({})
          .then(tasks => {
            Task.count({ completed: false, canceled: false })
              .then(pendingTasks => {
                Task.count({ completed: true, canceled: false })
                  .then(completedTasks => {
                    Task.count({ canceled: true,completed:false  })
                      .then(canceledTasks => {
                        Task.count({ deleted: true})
                          .then(deletedTasks => {
                            const total=pendingTasks+completedTasks+canceledTasks;
                            res.send({
                              total: total,
                              pending: pendingTasks,
                              completed: completedTasks,
                              canceled: canceledTasks,
                              deleted: deletedTasks
                            });
                          })
                          .catch(error => {
                            res.status(500).send({
                              message: error.message || "Some error occurred while retrieving deleted tasks."
                            });
                          });
                      })
                      .catch(error => {
                        res.status(500).send({
                          message: error.message || "Some error occurred while retrieving canceled tasks."
                        });
                      });
                  })
                  .catch(error => {
                    res.status(500).send({
                      message: error.message || "Some error occurred while retrieving completed tasks."
                    });
                  });
              })
              .catch(error => {
                res.status(500).send({
                  message: error.message || "Some error occurred while retrieving pending tasks."
                });
              });
          })
          .catch(error => {
            res.status(500).send({
              message: error.message || "Some error occurred while retrieving tasks."
            });
          });
      };
      