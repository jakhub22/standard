# ReactJS NextJS кодын стандарт болон зарчимууд

## Баримтлавал зохих зарчимууд

![SOLID Principles](https://miro.medium.com/max/1191/1*OzwARbvHUg1RlZ7LYyLCrg.png)

### 1. SRP: Single Responsibility Principle

SRP зарчимийн тодорхойлолт: Component бүр өөрийн ганц үүрэгтэй байхаар зохион бүтээх. Энэ нь code-ийг илүү readable, maintainable and scalable болгодог.

**SRP ашиглаагүй жишээ**

```js
function ProductList({ products }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    function handleSelectProduct(product) {
        setSelectedProduct(product);
    }

    function handleAddToCart() {
        // Add selected product to cart
    }

    return (
        <div>
            <ul>
                {products.map((product) => (
                    <li
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                    >
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                    </li>
                ))}
            </ul>
            {selectedProduct && (
                <div>
                    <h2>{selectedProduct.name}</h2>
                    <p>{selectedProduct.description}</p>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            )}
        </div>
    );
}
```

In the above example, the ProductList component has multiple responsibilities. It not only renders the list of products but also handles the selection of a product and adding it to the cart. This violates the SRP and makes the component difficult to maintain and test.

Дээрх жишээн дээр ProductList бүрэлдэхүүн хэсэг нь олон үүрэг хариуцлагатай байдаг. Энэ нь зөвхөн бүтээгдэхүүний жагсаалтыг гаргахаас гадна бүтээгдэхүүнийг сонгох, сагсанд нэмэх ажлыг гүйцэтгэдэг. Энэ нь SRP-г зөрчиж, бүрэлдэхүүн хэсгийг засварлах, туршихад хэцүү болгодог.

**SRP ашигласан жишээ**

```js
function ProductList({ products }) {
    return (
        <ul>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </ul>
    );
}

function Product({ product }) {
    return (
        <li>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
        </li>
    );
}
```

In the above example, the ProductList component only renders a list of products, and the Product component only renders the details of a single product. Both components have a single responsibility.

Дээрх жишээн дээр ProductList бүрэлдэхүүн нь зөвхөн бүтээгдэхүүний жагсаалтыг гаргадаг бөгөөд Бүтээгдэхүүний бүрэлдэхүүн хэсэг нь зөвхөн нэг бүтээгдэхүүний дэлгэрэнгүй мэдээллийг өгдөг. Хоёр бүрэлдэхүүн хэсэг нь нэг үүрэг хариуцлагатай байдаг.

### 2. OCP: Open-Closed Principle

OCP зарчимийн тодорхойлолт: Тухайн component өргөтгөл хийх боломжтой боловч өөрчлөхөд хаалттай байх ёстой. Жишээ нь **BUTTON** component дээр үзвэл. **BUTTON** component нь **Icon** харуулдаг гэж төсөөлье. Icon-ийг харуулахдаа **role** гэдэг prop-оор өөр өөр icon харуулах ёстой. Хэрэв OCP ашиглаагүй бол дараах байдалтай бичигдэх нь.

**OCP ашиглаагүй жишээ**

```js
function Product({ product }) {
    const [quantity, setquantity] = useState(1);

    function handleAddToCart() {
        // Add product to cart with the selected quantity
    }

    function handleIncrement() {
        setQuantity(quantity + 1);
    }

    function handleDecrement() {
        setQuantity(quantity - 1);
    }

    return (
        <li>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <div>
                <button onClick={handleDecrement}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrement}>+</button>
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </li>
    );
}
```

In the above example, the `Product` component has a new feature where the user can select the quantity of the product to add to the cart. However, this violates the OCP because the component's internal implementation was modified to handle the new feature. A better approach would be to create a separate `QuantitySelector` component that can be passed as a prop to the `Product` component.

Дээрх жишээн дээр "Бүтээгдэхүүний" бүрэлдэхүүн хэсэг нь шинэ функцтэй бөгөөд хэрэглэгч сагсанд нэмэх бүтээгдэхүүнийхээ хэмжээг сонгох боломжтой. Гэсэн хэдий ч, шинэ функцийг зохицуулахын тулд бүрэлдэхүүн хэсгийн дотоод хэрэгжилтийг өөрчилсөн тул энэ нь OCP-ийг зөрчиж байна. Илүү сайн арга бол "Бүтээгдэхүүний" бүрэлдэхүүн хэсэгт тулгуур болгон дамжуулж болох "QuantitySelector" тусдаа бүрэлдэхүүн хэсгийг бий болгох явдал юм.

**OCP ашигласан жишээ**

```js
function Product({ product, onAddToCart }) {
    return (
        <li>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <button onClick={onAddToCart}>Add to Cart</button>
        </li>
    );
}
```

In the above example, the Product component accepts a onAddToCart prop, which is a callback function that will be called when the "Add to Cart" button is clicked. This makes the component open for extension because new functionality can be added by passing a different callback function to the component.

Дээрх жишээн дээр Бүтээгдэхүүний бүрэлдэхүүн хэсэг нь onAddToCart тулгуурыг хүлээн авдаг бөгөөд энэ нь "Сагсанд нэмэх" товчийг дарахад дуудагдах дуудлагын функц юм. Энэ нь бүрэлдэхүүн хэсэг рүү залгах өөр функцийг дамжуулснаар шинэ функцийг нэмж болох тул өргөтгөл хийх боломжтой болгодог.

### 3. LCP: Liskov Substitution Principle

LCP зарчимын тодорхойлолт: Тухайн component нь supertype буюу native element-ийн attributes-ийг дэмждэг байхаар хийх. Жишээ нь search хийдэг **input text** component хийе гэж бодьё. Хэрэв тухайн component-ийг зөвхөн search хийдэг байдлаар хийе гэвэл зөвхөн **value**, **onChange** гэсэн function дамжуулахад хангалттай. Код дараах хэлбэртэй.

**LCP ашиглаагүй жишээ**

```js
class BaseComponent extends React.Component {
    // base component implementation
}

class SubComponent extends BaseComponent {
    // modified subcomponent implementation
}

function App() {
    return (
        <div>
            <BaseComponent />
            <SubComponent />
        </div>
    );
}
```

text

**LCP ашигласан жишээ**

```js
class BaseComponent extends React.Component {
    // base component implementation
}

class SubComponent extends BaseComponent {
    // subcomponent implementation
}
```

In the above example, the `SubComponent` extends the `BaseComponent` and can be used interchangeably with the `BaseComponent` without affecting the behavior of the app. This follows the LSP.

Дээрх жишээн дээр `Дэд бүрэлдэхүүн` нь `BaseComponent`-ийг өргөтгөж, програмын үйл ажиллагаанд нөлөөлөхгүйгээр `BaseComponent`-тэй сольж ашиглаж болно. Энэ нь LSP-ийг дагаж мөрддөг.

### 4. ICP: Interface Segregation Principle

ICP зарчимын тодорхойлолт: Тухайн component шаардлагагүй **Interface**-ээс хамаарах ёсгүй. Жишээ нь Product component-ийн зурагийг нь харуулдаг **Thumbnail** component байя гэж бодьё. **Thumbnail** component нь зөвхөн alt text-тэй img tag байна гэж үзвэл **Thumbnail** component нь **Product** interface-ийг бүтнээр авдаг байх нь буруу гэсэн үг.

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

text

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
```

In the above example, the `Product` component only receives the `name` and `description` props that it uses. This follows the ISP.

Дээрх жишээн дээр "Бүтээгдэхүүний" бүрэлдэхүүн хэсэг нь зөвхөн өөрийн ашигладаг "нэр" болон "тайлбар"-ыг хүлээн авдаг. Энэ нь ISP-ийг дагаж мөрддөг.

### 5. DIP - Dependency Inversion Principle

DIP зарчимын тодорхойлолт: Хараат байдлын урвуу зарчим. Нэн чухал шаардлагатай гэж үзээгүй тул оруулсангүй. Бас сайн ойлгосонгүй.

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

In the above example, the ProductList component depends on a concrete implementation (fetch('/api/products')) instead of an abstraction. This makes the component less flexible and harder to test.

Дээрх жишээнд ProductList бүрэлдэхүүн хэсэг нь хийсвэрлэлийн оронд тодорхой хэрэгжилтээс (fetch('/api/products')) хамаардаг. Энэ нь бүрэлдэхүүн хэсгийг уян хатан бус болгож, шалгахад хэцүү болгодог.

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

In the above example, the ProductList component depends on the productService abstraction instead of a concrete implementation. This allows the component to be more flexible and easily testable.

Дээрх жишээнд ProductList бүрэлдэхүүн хэсэг нь тодорхой хэрэгжилтийн оронд productService хийсвэрлэлээс хамаардаг. Энэ нь бүрэлдэхүүн хэсэг нь илүү уян хатан, амархан турших боломжийг олгодог.

![More Principles](https://miro.medium.com/max/3800/1*RQJCJDy_JxfRXPvSpkN3Jg.png)

### 1. YAGNI: You Aren't Gonna Need It

Хэрэгцээгүй шинэ функц, нэмэлтээр оруулах хэрэггүй. Ирээдүйд хэрэг болж юуны магад гээд нэмэлтээр юм оруулчих тал байдаг. Гэвч ашиглагдахгүй удсан тохиолдолд, хэсэг хугацааны дараа энийг юунд ашигладаг юм бол? яах гэж оруулсан юм бол? гэх асуултуудыг бий болж ирэх нь бий.

### 2. KISS: Keep It Simple Stupid

Аль болох энгийнээр бичигдсэн байх. Илүүдэл ойлгоход хэцүү ярвигтай зүйл бичихээс зайлсхийх, жижиг хэсгүүдэд хувааж энгийн болгох. Гэхдээ хэт амарчилж болохгүй.

### 3. DRY: Don't Repeat Yourself

Нэг бичсэн кодоо дахин давтахгүй байх. Анхлан бичигчдэд их тохиолддог. Олон газар давхардсан кодууд ашиглах нь дараа засаж сайжруулах үед бүгдийг өөрчлөх шаардлага гарч мэднэ. Энэ үед маш их цаг хүч шаардагддаг.
