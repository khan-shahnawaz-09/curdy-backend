const { taskModel } = require("../model/taskModule");
//error handling
const {
  handleCatchBlock,
  handleNotFound,
  handleRequired,
} = require("../utils/handlingError");

const showTask = async (req, res) => {
  const { status, priority, page = 1, limit = 5 } = req.query;
  const sort = req.query.sort || "createAt";
  const order = req.query.order || "acc";
  try {
    const filter = {}; //empty means show all datas
    if (status) {
      filter.status = status;
    }
    if (priority) {
      filter.priority = priority;
    }
    //skip the privious page's task when user click next.
    const skip = (Number(page) - 1) * Number(limit);
    const tasks = await taskModel
      .find(filter)
      .sort(sort) //based on duedate,createAt
      .skip(skip)
      .limit(limit);
    res.status(200).json({ success: true, tasks: tasks });
  } catch (error) {
    handleCatchBlock(res, error, "something wrong while fething task");
  }
};

//add the task
const addTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  try {
    if (!title) {
      return handleRequired(res, "title is required");
    }
    if (!description) {
      return handleRequired(res, "decription is required");
    }
    const newTask = await new taskModel({
      title,
      description,
      status,
      priority,
      dueDate,
    }).save();
    res.status(201).json({ success: true, msg: "task added", task: newTask });
  } catch (error) {
    handleCatchBlock(res, error, "something wrong while adding task");
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedtask = await taskModel.findByIdAndDelete(id);
    if (deletedtask) {
      res.status(200).json({ success: true, msg: "task deleted" });
    } else {
      return handleNotFound(res, "task not found");
    }
  } catch (error) {
    handleCatchBlock(res, error, "something wrong while deleting task");
  }
};
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { newTitle, newDescription, newStatus, newPriority, newDueDate } =
    req.body;
  try {
    const updateFields = {};
    if (newTitle) updateFields.title = newTitle;
    if (newDescription) updateFields.description = newDescription;
    if (newStatus) updateFields.status = newStatus;
    if (newPriority) updateFields.priority = newPriority;
    if (newDueDate) updateFields.dueDate = newDueDate;

    const updatedTask = await taskModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    console.log(updatedTask);
    if (!updatedTask) {
      return handleNotFound(res, "task not found");
    }
    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    handleCatchBlock(res, error, "something wrong while editing task");
  }
};
module.exports = { addTask, showTask, deleteTask, updateTask };
