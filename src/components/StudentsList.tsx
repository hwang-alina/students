import "./StudentsList.css";
import {
  Button,
  DatePicker,
  Form,
  Icon,
  Input,
  List,
  Modal,
  Select
} from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { Student } from "../types/Student";
import { AppState } from "../store/storeConfig";
import * as React from "react";
import { FormComponentProps } from "antd/lib/form/Form";
import { bindActionCreators, Dispatch } from "redux";
import {
  addStudent,
  editStudent,
  removeStudent,
  setMarks,
  setStudents
} from "../actions";

interface StudentsListProps {
  students: Student[];
  marks: string[];
}

interface StudentsListState {
  modal: {
    visible: boolean;
    type: "" | "add" | "edit";
    index?: number;
  };
}

type Props = StudentsListProps & FormComponentProps & LinkDispatchProps;

const fakeStudents: Student[] = [
  {
    name: "Lucy",
    birthday: "23.08.2005",
    mark: "A"
  },
  {
    name: "Ann",
    birthday: "23.08.2005",
    mark: "B"
  },
  {
    name: "Liz",
    birthday: "23.08.2005",
    mark: "C"
  },
  {
    name: "Kim",
    birthday: "23.08.2005",
    mark: "D"
  },
  {
    name: "John",
    birthday: "23.08.2005",
    mark: "F"
  }
];

const fakeMarks: string[] = ["A", "B", "C", "D", "F"];

class StudentsList extends React.Component<Props, StudentsListState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modal: {
        visible: false,
        type: ""
      }
    };
  }

  componentDidMount() {
    this.props.setStudents(fakeStudents);
    this.props.setMarks(fakeMarks);
  }

  showModal = (modalType: "" | "add" | "edit", index: number) => {
    const { students, form } = this.props;
    if (modalType === "add") {
      this.setState({
        modal: {
          visible: true,
          type: "add"
        }
      });
    } else if (modalType === "edit") {
      form.setFieldsValue({
        name: students[index].name,
        birthday: moment(students[index].birthday, "DD,MM,YYYY"),
        mark: students[index].mark
      });
      this.setState({
        modal: {
          visible: true,
          type: "edit",
          index: index
        }
      });
    }
  };

  handleAdd = (e: { preventDefault: () => void }) => {
    const { form, addStudent } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const newStudent = {
          name: values.name,
          birthday: values.birthday.format("DD.MM.YYYY"),
          mark: values.mark
        };
        addStudent(newStudent);
        form.resetFields();
        this.setState({
          modal: {
            visible: false,
            type: ""
          }
        });
      } else console.log(err);
    });
  };

  handleEdit = (e: { preventDefault: () => void }) => {
    const { form, editStudent } = this.props;
    const { modal } = this.state;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if (modal.index !== undefined) {
          const editedStudent = {
            name: values.name,
            birthday: values.birthday.format("DD.MM.YYYY"),
            mark: values.mark
          };
          editStudent(modal.index, editedStudent);
          form.resetFields();
          this.setState({
            modal: {
              visible: false,
              type: ""
            }
          });
        }
      } else console.log(err);
    });
  };

  handleCancel = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      modal: {
        visible: false,
        type: ""
      }
    });
  };

  showDeleteConfirm = (studentID: number) => {
    const { students, removeStudent } = this.props;
    Modal.confirm({
      title: "Are you sure to delete this student?",
      content: students[studentID].name,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeStudent(studentID);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { students, marks } = this.props;
    const { modal } = this.state;

    return (
      <div className="studentsList">
        <h1>Students List</h1>
        <List
          bordered
          dataSource={students}
          renderItem={(item, index) => (
            <List.Item
              actions={[
                <a
                  key="list-edit"
                  onClick={() => this.showModal("edit", index)}
                >
                  <Icon type="edit" />
                </a>,
                <a
                  key="list-delete"
                  onClick={() => this.showDeleteConfirm(index)}
                >
                  <Icon type="delete" />
                </a>
              ]}
            >
              <List.Item.Meta title={item.name} description={item.birthday} />
              <div>{item.mark}</div>
            </List.Item>
          )}
        />
        <Button
          className="addButton"
          onClick={() => this.showModal("add", NaN)}
          icon="plus"
          block
          type="primary"
        >
          Add student
        </Button>
        <Modal
          title={modal.type === "add" ? "Add student" : "Edit student"}
          visible={modal.visible}
          okText={modal.type === "add" ? "Add" : "Edit"}
          onOk={modal.type === "add" ? this.handleAdd : this.handleEdit}
          okButtonProps={{ form: "form-in-modal", htmlType: "submit" }}
          onCancel={this.handleCancel}
        >
          <Form id="form-in-modal" layout="vertical">
            <Form.Item>
              {getFieldDecorator("name", {
                validateTrigger: "onBlur",
                rules: [
                  {
                    required: true,
                    message: "Required field"
                  }
                ]
              })(<Input placeholder="Name" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("birthday", {
                rules: [
                  {
                    required: true,
                    message: "Required field"
                  }
                ]
              })(<DatePicker placeholder="Select birthday" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("mark")(
                <Select allowClear placeholder="Mark" style={{ width: 120 }}>
                  {marks &&
                    marks.map((item, id) => (
                      <Select.Option key={id} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

interface LinkStateProps {
  students: Student[];
  marks: string[];
}

interface LinkDispatchProps {
  setStudents: (students: Student[]) => void;
  setMarks: (marks: string[]) => void;
  addStudent: (student: Student) => void;
  editStudent: (id: number, newValue: Student) => void;
  removeStudent: (id: number) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => ({
  students: state.students,
  marks: state.marks
});

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchProps => {
  return {
    setStudents: bindActionCreators(setStudents, dispatch),
    setMarks: bindActionCreators(setMarks, dispatch),
    addStudent: bindActionCreators(addStudent, dispatch),
    editStudent: bindActionCreators(editStudent, dispatch),
    removeStudent: bindActionCreators(removeStudent, dispatch)
  };
};

const WrappedStudentsList = Form.create({ name: 'student' })(StudentsList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedStudentsList);
