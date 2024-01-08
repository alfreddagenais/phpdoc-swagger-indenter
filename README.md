# PHPDoc Swagger Indenter

Streamline your Swagger/OpenAPI PHP documentation with PHPDoc Swagger Indenter for VSCode. This extension simplifies comment formatting, ensuring clean, readable annotations for efficient API spec generation.

---

## Table of contents

- [Table of contents](#table-of-contents)
- [Description](#description)
- [Usage](#usage)
  - [Installation](#installation)
  - [Formatting comment blocks](#formatting-comment-blocks)
    - [Example](#example)
  - [Unformatting](#unformatting)
- [License](#license)

## Description

Easily format your Swagger/OpenAPI annotations in PHP with the PHPDoc Swagger Indenter extension for Visual Studio Code. This tool specifically addresses the challenge of maintaining clean and readable PHPDoc comments for Swagger/OpenAPI specifications.

Say goodbye to the tedious manual spacing or JSON workarounds. Our extension enables effortless indentation and formatting within comment blocks, ensuring that your Swagger-jsdoc can seamlessly parse and generate API specifications. Ideal for PHP developers seeking efficient Swagger documentation workflow, this extension is a must-have for enhancing your API development experience.

> VSCode enables automatic indentation when there's no preceding asterisk (`*`).

```php
/**
 * You won't be able to get automatic indentation here
 * or here
 * 
but you'll
  get it here,
  when there's no asterisk
    preceding the line
 */
```

## Usage

### Installation

Install the extension from the [installation page](https://marketplace.visualstudio.com/items?itemName=AlfredDagenais.phpdoc-swagger-indenter).

### Formatting Comment Blocks

For the extension to correctly parse your comment block, it should follow the following guidelines:

- The spec has to start with either `@swagger` or `@openapi`
- The comment should start with `/**`
- No line (of the spec only) should start with an asterisk (`*`)
- It can contain regular comments preceded by an asterisk before the spec
- **Before running the extension you must place your cursor within the comment block**

To ensure that our extension seamlessly parses your comment blocks, here are some simple yet effective guidelines to follow:

- Begin your specification with either `@swagger` or `@openapi` for clear identification.
- Start your comment with `/**` to maintain consistency and clarity.
- Within the specification itself, avoid starting any line with an asterisk (`*`) for better readability.
- Feel free to include regular comments with an asterisk before the specification for added context or clarification.
- **To activate the extension's magic, simply place your cursor within the comment block.**

#### Example

Write your specification

```ts
/**
 * Specification for the route /users/{id}
 *
@swagger
@OA\Put(
    path="/users/{id}",
    summary="Updates a user",
    description="Updates a user",
    operationId="updateUser",
    tags={"user"},
    @OA\Parameter(
        description="Parameter with mutliple examples",
        in="path",
        name="id",
        required=true,
        @OA\Schema(type="string"),
        @OA\Examples(example="int", value="1", summary="An int value."),
        @OA\Examples(example="uuid", value="0006faf6-7a61-426c-9034-579f2cfcfa83", summary="An UUID value."),
    ),
    @OA\Response(
        response=200,
        description="OK"
    )
)
 */
```

Getting your comment blocks formatted is just a few keystrokes away! Here's how you can do it in a snap:

- Simply place your cursor within the comment block where you want the magic to happen.
- On your keyboard, press `cmd + shift + P` (for MacOS) or `ctrl + shift + P` (for Windows) to open the command palette.
- Type in and select `Swagger PHPDoc: Format spec` to initiate the formatting process.

Here's what our friendly extension will do for you:

- Utilize [Prettier](https://prettier.io/), the powerful code formatter, to effortlessly fix or catch any indentation errors.
- Gracefully add an asterisk at the beginning of each line, ensuring consistency and readability.
- Seamlessly replace your existing comment block with a beautifully formatted version.
- Thoughtfully respect and maintain any existing indentation in your block, keeping your personal style intact.

```php
/**
 * Spec for the route /users/{id}
 * 
 * @swagger
 * @OA\Put(
 *     path="/users/{id}",
 *     summary="Updates a user",
 *     description="Updates a user",
 *     operationId="updateUser",
 *     tags={"user"},
 *     @OA\Parameter(
 *         description="Parameter with mutliple examples",
 *         in="path",
 *         name="id",
 *         required=true,
 *         @OA\Schema(type="string"),
 *         @OA\Examples(example="int", value="1", summary="An int value."),
 *         @OA\Examples(example="uuid", value="0006faf6-7a61-426c-9034-579f2cfcfa83", summary="An UUID value."),
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="OK"
 *     )
 * )
 */
```

### Unformatting

Sometimes, you might want to step back and make a few changes to your documentation. No worries! Our extension makes it a breeze to undo the formatting for effortless editing.

Here's how you can revert the formatting:

- Place your cursor inside the comment block you wish to edit.
- Press `cmd + shift + P` (on MacOS) or `ctrl + shift + P` (on Windows) to bring up the command palette.
- Search for and select `Swagger PHPDoc: Unformat spec`.

What this does is quite simple yet effective:

- It removes the added asterisks, giving you a clean slate to edit your spec.
- This allows you to modify your spec with ease, keeping indentation intact for a smooth editing experience.
- Once you've made your edits, you can quickly [reformat](#formatting-comment-blocks) your comment block with the same ease.

Our tool is here to ensure that your documentation workflow is as seamless and efficient as possible, allowing you to focus more on your brilliant code! 🚀💼

## License

MIT

---

**Enjoy!**
