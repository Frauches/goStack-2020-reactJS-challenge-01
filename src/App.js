import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories();
  }, []);

  const getRepositories = () => {
    api
      .get("/repositories")
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleAddRepository() {
    api
      .post("/repositories", {
        title: "goStack-2020-reactJS-challenge-01",
        url: "https://github.com/Frauches/goStack-2020-reactJS-challenge-01",
        techs: ["React JS", "Node JS"],
      })
      .then((response) => {
        setRepositories([...repositories, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleRemoveRepository(id) {
    api
      .delete(`/repositories/${id}`)
      .then((response) => {
        if (response.status === 204) {
          setRepositories(
            repositories.filter((repository) => repository.id !== id)
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
