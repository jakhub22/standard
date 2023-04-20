# ReactJS NextJS кодын стандарт болон зарчимууд

## Баримтлавал зохих зарчимууд

## SOLID

![SOLID Principles](https://miro.medium.com/max/1191/1*OzwARbvHUg1RlZ7LYyLCrg.png)

### 1. SRP: Single Responsibility Principle

Тодорхойлолт: Component бүр өөрийн ганц үүрэгтэй байхаар зохион бүтээх. Энэ нь code-ийг илүү readable, maintainable and scalable болгодог.
Хэрэв бүрэлдэхүүн хэсэг нь олон үүрэгтэй бол түүнийг засварлах, шалгахад хэцүү болно.

**SRP ашиглаагүй жишээ**

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
                <div>
                    <h2>User Profile</h2>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
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

Тодорхойлолт: OCP нь class эсвэл модулийг өргөтгөхөд нээлттэй боловч өөрчлөхөд хаалттай байх ёстой. Component хэсэг нь шинэ props эсвэл state-ийг хүлээн авахад нээлттэй байх ёстой, гэхдээ түүний дотоод хэрэгжилтийг өөрчлөх ёсгүй.

**OCP ашиглаагүй жишээ**

```js
function Button(props) {
    const { label, onClick, color } = props;

    return (
        <button onClick={onClick} style={{ backgroundColor: color }}>
            {label}
        </button>
    );
}
```

**OCP ашигласан жишээ**

```js
function BaseButton(props) {
    const { label, onClick, style } = props;

    return (
        <button onClick={onClick} style={style}>
            {label}
        </button>
    );
}
```

### 3. LCP: Liskov Substitution Principle

Тодорхойлолт: Тухайн component нь supertype буюу native element-ийн attributes-ийг дэмждэг байхаар хийх. Child component нь програмын үйл ажиллагаанд нөлөөлөхгүйгээр parent component-г орлуулах боломжтой байх ёстой.

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

Тодорхойлолт: Хараат байдлын урвуу зарчим. DIP нь өндөр түвшний модулиуд нь доод түвшний модулиудаас хамаарах ёсгүй гэж заасан. Аль аль нь хийсвэрлэлээс хамаарах ёстой. ReactJS-д энэ зарчмыг бүрэлдэхүүн хэсгийн хамааралд хэрэглэж болно. Бүрэлдэхүүн хэсэг нь тодорхой хэрэгжилтийн оронд хийсвэрлэлээс хамаарах ёстой.

**DIP ашиглаагүй жишээ**

```js
function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then((response) => response.json())
            .then(setProducts);
    }, []);

    return (
        <ul>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </ul>
    );
}
```

**DIP ашигласан жишээ**

```js
function ProductList({ productService }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        productService.getProducts().then(setProducts);
    }, [productService]);

    return (
        <ul>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </ul>
    );
}
```

## Folder Structure

### 1. Folder-ийг сamelCase ашиглан үүсгэх

-   components/
    -   layout/
        -   Header.js
        -   Footer.js
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

Header.js
HeroBanner.js
CookieBanner.js
BlogListing.js

### 2. Component биш файлийн нэрийг camelCase ашиглан бичих

myUtilityFile.js
cookieHelper.js
fetchApi.js

### 3. Unit тэст файлийн нэрийг харгалзах файлтай адил нэр ашиглан бичих

CookieBanner.js
CookieBanner.test.js

fetchData.js
fetchData.test.js

### 4. Attribute болон parameter функцын нэрийг camelCase ашиглан бичих

className
onClick

function onChangeHandle()

### 4. Хувьсагч болон state-ийн нэрийг camelCase ашиглан бичих

const variable = 'test';
let variableBoolean = true;
const [userName,setUserName] = useState();

### 5. Css файл үүсгэх бол харгалзах файлтай адил нэр ашиглан module css файл үүсгэх

CookieBanner.js
CookieBanner.module.css

Header.js
Header.module.css

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
