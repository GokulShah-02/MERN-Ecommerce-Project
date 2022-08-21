import React from "react";
import {Form, InputGroup} from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {
  const [keyword, setKeyword] = React.useState("");

  function handleSearch(event) {
      event.preventDefault();
      if(keyword.trim()) {
        setKeyword("");
        window.history.pushState({}, undefined, `/products/${keyword}`);
        window.location.reload();
      }
      else {
        window.history.pushState({}, undefined, "/products");
        window.location.reload();
      }
  }

  return(
    <Form onSubmit={handleSearch} className="d-flex" style={{maxWidth: "60vw"}}>
      <InputGroup>
        <Form.Control
          type="text"
          style = {{
            border: '2px solid #FF0000',
						borderRight: 'none'
          }}
          name="keyword"
          className="mr-sm-2 ml-sm-4"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products..."
          value={keyword}
        />
        <InputGroup.Text style = {{
          background: 'white',
					border: '2px solid #FF0000',
					borderLeft: 'none'
          }}
        >
          <button
            aria-label='search'
						style={{
							margin: '0',
							border: '0',
							outline: '0',
							background: 'transparent',
							padding: '0',
						}}
						type='submit'>
            <SearchIcon />
          </button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
