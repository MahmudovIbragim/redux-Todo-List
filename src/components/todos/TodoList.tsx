import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store";
import { useState } from "react";
import {
  addTodo,
  deleteAll,
  deleteTodo,
  upDateTodo,
} from "../../redux/tools/todoSLice";
import scss from "./TodoList.module.scss";

const TodoList = () => {
  const todo = useAppSelector((state) => state.todoReducer.data);
  const dispach = useDispatch();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState(0);
  const [newName, setNewName] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [newPrice, setNewPrice] = useState(0);
  const [upDate, setUpDate] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (name === "" || image === "" || price === 0) {
      alert("Заполни все поли");
    } else {
      dispach(
        addTodo({
          name: name,
          image: image,
          price: price,
        })
      );
      setName("");
      setImage("");
      setPrice(0);
    }
  };

  const deleteTodoItem = (id: number) => {
    dispach(deleteTodo({ id }));
  };

  const upDateTodoItem = (id: number) => {
    const filteredItem = todo.find((item) => item.id === id);
    if (filteredItem) {
      dispach(
        upDateTodo({
          name: newName || filteredItem.name,
          image: newImage || filteredItem.image,
          price: newPrice || filteredItem.price,
        })
      );
      setUpDate(null);
    }
  };
  const handleChange = (id: number) => {
    setUpDate(id);
  };
  const deleteItems = () => {
    dispach(deleteAll());
  };

  return (
    <div className="container">
      <div className={scss.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="url"
          placeholder="Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
        />
        <button className={scss.add_btn} onClick={handleAddTodo}>
          Добавить
        </button>
        <button className={scss.remove_btn} onClick={deleteItems}>
          удалить
        </button>
      </div>
      <div className={scss.content}>
        {todo.map((item) => (
          <div className={scss.box} key={item.id}>
            {item.id === upDate ? (
              <div className={scss.newForm}>
                <input
                  type="text"
                  placeholder="New Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="New Image"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="New Price"
                  value={newPrice}
                  onChange={(e) => setNewPrice(+e.target.value)}
                />
                <div className={scss.newForm_btn}>
                  <button onClick={() => upDateTodoItem(item.id)}>
                    Сохранить
                  </button>
                  <button onClick={() => setUpDate(null)}>Отмена</button>
                </div>
              </div>
            ) : (
              <>
                <div className={scss.card}>
                  <h1>{item.name}</h1>
                  <img src={item.image} alt="img" />
                  <h3>{item.price}</h3>
                  <div className={scss.card_btn}>
                    <button onClick={() => deleteTodoItem(item.id)}>
                      Удалить
                    </button>
                    <button
                      onClick={() => {
                        handleChange(item.id);
                        setNewName(item.name);
                        setNewImage(item.image);
                        setNewPrice(item.price);
                      }}
                    >
                      Изменить
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
