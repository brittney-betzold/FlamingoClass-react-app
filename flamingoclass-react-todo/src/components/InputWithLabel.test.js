const { string } = require('prop-types')
const { render } = require('react-dom')
const InputWithLabel = require('./InputWithLabel')

test("Input renders without crashing", () => {
    render(
    <InputWithLabel
      children="Test Label"
      todoTitle="Test Todo"
      handleTitleChange={() => { /* your mock function here */ }}
    />
    );
})
