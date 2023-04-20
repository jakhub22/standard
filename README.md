# ReactJS NextJS кодын стандарт болон зарчимууд

## Баримтлавал зохих зарчимууд

## SOLID

![SOLID Principles](https://miro.medium.com/max/1191/1*OzwARbvHUg1RlZ7LYyLCrg.png)

### 1. SRP: Single Responsibility Principle

Тодорхойлолт: Component бүр өөрийн ганц үүрэгтэй байхаар зохион бүтээх.

**SRP ашиглаагүй жишээ**

```js
function UserProfile(props) {
    const { blog } = props;
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.example.com/users/123')
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div>
                    <div>
                        <h2>User Profile</h2>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </div>
                    <div>
                        <h2>Blogs</h2>
                        <p>Title: {blog.title}</p>
                        <p>{blog.data}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
```

**SRP ашигласан жишээ**

```js
function UserProfile() {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://api.example.com/users/123')
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <UserProfileDisplay user={user} />
            )}
        </div>
    );
}

function UserProfileDisplay(props) {
    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {props.user.name}</p>
            <p>Email: {props.user.email}</p>
        </div>
    );
}
```

### 2. OCP: Open-Closed Principle

Тодорхойлолт: OCP нь component-ийг өргөтгөхөд нээлттэй боловч өөрчлөхөд хаалттай байх ёстой.

**OCP ашиглаагүй жишээ**

```js
import {
    HiOutlineArrowNarrowRight,
    HiOutlineArrowNarrowLeft,
} from 'react-icons/hi';

export function Button(props) {
    const { text, role } = props;

    return (
        <button
            className="flex items-center rounded-xl bg-gray-200 pt-4 pb-4 pl-8 pr-8 font-bold text-black outline-none"
            {...props}
        >
            {text}
            <div className="m-2">
                {role === 'forward' && <HiOutlineArrowNarrowRight />}
                {role === 'back' && <HiOutlineArrowNarrowLeft />}
            </div>
        </button>
    );
}

<Button text="Go Home" role="forward" />;
```

**OCP ашигласан жишээ**

```js
export function Button(props) {
    const { text, icon } = props;

    return (
        <button
            className="flex items-center rounded-xl bg-gray-200 pt-4 pb-4 pl-8 pr-8 font-bold text-black outline-none"
            {...props}
        >
            {text}
            <div className="m-2">{icon}</div>
        </button>
    );
}

<Button text="Go Home" icon={<HiOutlineArrowNarrowRight />} />;
```

### 3. LCP: Liskov Substitution Principle

Тодорхойлолт: Тухайн component нь supertype буюу native element-ийн attributes-ийг дэмждэг байхаар хийх.

**LCP ашиглаагүй жишээ**

```js
export function SearchInput(props) {
    const { value, onChange } = props;

    return (
        <input
            type="search"
            id="default-search"
            placeholder="Search for the right one..."
            required
            value={value}
            onChange={onChange}
        />
    );
}
```

**LCP ашигласан жишээ**

```js
export function SearchInput(props: ISearchInputProps) {
    const { value, isLarge, ...restProps } = props;

    return (
        <input
            type="search"
            id="default-search"
            placeholder="Search for the right one..."
            className={`${isLarge ? 'w-full' : 'w-auto'}`}
            required
            value={value}
            {...restProps}
        />
    );
}
```

### 4. ICP: Interface Segregation Principle

Тодорхойлолт: Тухайн component шаардлагагүй **Interface**-ээс хамаарах ёсгүй.

**ICP ашиглаагүй жишээ**

```js
function Product({ product }) {
    return (
        <li>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
        </li>
    );
}

function App() {
    const products = [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
    ];

    return (
        <ul>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </ul>
    );
}
```

**ICP ашигласан жишээ**

```js
function Product({ name, description }) {
    return (
        <li>
            <h2>{name}</h2>
            <p>{description}</p>
        </li>
    );
}

function App() {
    const products = [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
    ];

    return (
        <ul>
            {products.map((product) => (
                <Product
                    key={product.id}
                    name={product.name}
                    description={product.description}
                />
            ))}
        </ul>
    );
}
```

### 5. DIP - Dependency Inversion Principle

Тодорхойлолт: Хараат байдлын урвуу зарчим. DIP нь өндөр түвшний модулиуд нь доод түвшний модулиудаас хамаарах ёсгүй, гэхдээ хоёулаа хийсвэрлэлээс хамаарах ёстой. Хийсвэрлэл нь нарийн ширийн зүйлээс хамаарах ёсгүй, харин нарийн зүйл нь хийсвэрлэлээс хамаарах ёстой.

**DIP ашиглаагүй жишээ**

```js
import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Increment</button>
        </div>
    );
};

export default Counter;
```

Дээрх жишээн дээр Counter component нь useState-ээс шууд хамааралтай байна. Өндөр түвшний модуль (Counter) нь доод түвшний модулиас (useState) шууд хамааралтай байгаа тул энэ нь DIP-ийг зөрчиж байна.

**DIP ашигласан жишээ**

```js
import React from 'react';

const useCounter = () => {
    const [count, setCount] = React.useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return {
        count,
        handleClick,
    };
};

const Counter = () => {
    const { count, handleClick } = useCounter();

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={handleClick}>Increment</button>
        </div>
    );
};

export default Counter;
```

Дээрх жишээн дээр бид userCounter нэртэй custom hook ашигласан. Counter component нь useState hook-ийн тодорхой хэрэгжилтээс илүү хийсвэр useCounter hook-ээс хамаарна. Дээд түвшний модуль (Counter) нь доод түвшний модулиас (useState) бус хийсвэрлэлээс (useCounter) хамаардаг тул энэ нь DIP-ийг дагаж байна.

## Folder Structure

### 1. Folder-ийг сamelCase ашиглан үүсгэх

-   components/
    -   layout/
        -   Header.js
        -   Footer.js
        -   Header.modile.css
    -   blog/
        -   Post.js
        -   Comment.js
    -   product/
        -   List.js
        -   Details.js

### 2. Folder дотор үндсэн export хийх index.js Файл үүсгэн export хийх

-   components/
    -   layout/
        -   index.js
        -   Header.js
        -   Footer.js
    -   blog/
        -   index.js
        -   Post.js
        -   Comment.js
    -   product/
        -   index.js
        -   List.js
        -   Details.js

## Код бичиглэлийн стандарт

### 1. Component-ийн нэрийг PascalCase ашиглан бичих

```js
Header.js;
HeroBanner.js;
CookieBanner.js;
BlogListing.js;
```

### 2. Component биш файлийн нэрийг camelCase ашиглан бичих

```js
myUtilityFile.js;
cookieHelper.js;
fetchApi.js;
```

### 3. Unit тэст файлийн нэрийг харгалзах файлтай адил нэр ашиглан бичих

```js
CookieBanner.js;
CookieBanner.test.js;

fetchData.js;
fetchData.test.js;
```

### 4. Attribute болон parameter функцын нэрийг camelCase ашиглан бичих

```js
className
onClick

function onChangeHandle()
```

### 4. Хувьсагч болон state-ийн нэрийг camelCase ашиглан бичих

```js
const variable = 'test';
let variableBoolean = true;
const [userName, setUserName] = useState();
```

### 5. Css файл үүсгэх бол харгалзах файлтай адил нэр ашиглан module css файл үүсгэх

```js
CookieBanner.js;
CookieBanner.module.css;

Header.js;
Header.module.css;
```

### 6. Кодыг уншиж ойлгоход хялбар байхын тулд догол болон зайг ашиглах.

```js
import React from 'react';

function ExampleComponent(props) {
    const { data } = props;

    function handleClick() {
        console.log('Button clicked!');
    }

    return (
        <div className="example-component">
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
}

export default ExampleComponent;
```

### 7. Proptypes ашиглан Component-д шаардлагтай зүйлсийг тодорхойлж өгөх.

```js
import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    const { onClick, children } = props;

    return <button onClick={onClick}>{children}</button>;
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Button;
```

### 8. State management буюу context ашиглах

State management нь application болон system-ийн төлөвийг удирдах, шинэчлэх үйл явцыг хэлнэ.State management нь component болон модулиудыг өөр хоорондоо харилцах, програмын төлөв байдлыг тогтмол харах боломжийг олгодог тул нарийн төвөгтэй програмуудыг бий болгох чухал үүрэгтэй.

### 9. Error Handling

Error Handling хийх нь алдааны message-ийг цэвэрлэх, зохион байгуулахаас гадна unexpected errors болон crashes-аас сэргийлнэ.

```js
function LoginForm({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await onSubmit(username, password);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div>
                <button type="submit">Log in</button>
            </div>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
}
```

### 10. Security

Component-үүд нь аюулгүй байдлын үүднээс хийгдсэн эсэхийг шалгаарай. Аюулгүй код бичэж нийтлэг security vulnerabilities-үүдээс сэргийлээрэй.

```js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ensure that username and password are not empty before submitting the form
        if (username && password) {
            onSubmit(username, password);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
```

Энэ жишээн дээр component-ийн төлөвийг manage хийхийн тулд useState hook ашигласан. Мөн props-ийг баталгаажуулахын тулд prop-types ашигласан. Аюулгүй байдлын үүднээс submit хийхийн өмнө username болон password хоосон байгаа эсэхийг шалгаж байна. Ингэснээрээ болзошгүй injection attack-аас сэргийлж өгнө. Мөн label element-д for-ийн оронд htmlFor ашигласанаараа Cross-Site Scripting (XSS) attack-аас сэргийлэх юм. Нэмэлтээр prop-types-д isRequired prop зарласнаараа component рүү onSubmit prop-оор дамжуулагдагж байгааг баталгаажуулах юм.

### 10. Code Review

Component-үүд нь кодчиллын стандарт, зарчимуудыг дагаж мөрдөж байгаа эсэхийг баталгаажуулахын тулд кодын хянан шалгах хэрэгтэй. Reviewers кодын чанар, үйл ажиллагааны талаар санал хүсэлтээ өгөх ёстой.
