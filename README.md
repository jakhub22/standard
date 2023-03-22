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

Ингэснээр дуудаж ашиглаж байгаа parent component-ууд **onFocus**, **onBlur** гэх мэт event-үүдийг ашиглах боломжтой болох юм.

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

### 2. OCP: Open-Closed Principle

OCP зарчимийн тодорхойлолт: Тухайн component өргөтгөл хийх боломжтой боловч өөрчлөхөд хаалттай байх ёстой. Жишээ нь **BUTTON** component дээр үзвэл. **BUTTON** component нь **Icon** харуулдаг гэж төсөөлье. Icon-ийг харуулахдаа **role** гэдэг prop-оор өөр өөр icon харуулах ёстой. Хэрэв OCP ашиглаагүй бол дараах байдалтай бичигдэх нь.

### 3. LCP: Liskov Substitution Principle

LCP зарчимын тодорхойлолт: Тухайн component нь supertype буюу native element-ийн attributes-ийг дэмждэг байхаар хийх. Жишээ нь search хийдэг **input text** component хийе гэж бодьё. Хэрэв тухайн component-ийг зөвхөн search хийдэг байдлаар хийе гэвэл зөвхөн **value**, **onChange** гэсэн function дамжуулахад хангалттай. Код дараах хэлбэртэй.

### 4. ICP: Interface Segregation Principle

ICP зарчимын тодорхойлолт: Тухайн component шаардлагагүй **Interface**-ээс хамаарах ёсгүй. Жишээ нь Product component-ийн зурагийг нь харуулдаг **Thumbnail** component байя гэж бодьё. **Thumbnail** component нь зөвхөн alt text-тэй img tag байна гэж үзвэл **Thumbnail** component нь **Product** interface-ийг бүтнээр авдаг байх нь буруу гэсэн үг.

### 5. DIP - Dependency Inversion Principle

DIP зарчимын тодорхойлолт: Хараат байдлын урвуу зарчим. Нэн чухал шаардлагатай гэж үзээгүй тул оруулсангүй. Бас сайн ойлгосонгүй.

![More Principles](https://miro.medium.com/max/3800/1*RQJCJDy_JxfRXPvSpkN3Jg.png)

### 1. YAGNI: You Aren't Gonna Need It

Хэрэгцээгүй шинэ функц, нэмэлтээр оруулах хэрэггүй. Ирээдүйд хэрэг болж юуны магад гээд нэмэлтээр юм оруулчих тал байдаг. Гэвч ашиглагдахгүй удсан тохиолдолд, хэсэг хугацааны дараа энийг юунд ашигладаг юм бол? яах гэж оруулсан юм бол? гэх асуултуудыг бий болж ирэх нь бий.

### 2. KISS: Keep It Simple Stupid

Аль болох энгийнээр бичигдсэн байх. Илүүдэл ойлгоход хэцүү ярвигтай зүйл бичихээс зайлсхийх, жижиг хэсгүүдэд хувааж энгийн болгох. Гэхдээ хэт амарчилж болохгүй.

### 3. DRY: Don't Repeat Yourself

Нэг бичсэн кодоо дахин давтахгүй байх. Анхлан бичигчдэд их тохиолддог. Олон газар давхардсан кодууд ашиглах нь дараа засаж сайжруулах үед бүгдийг өөрчлөх шаардлага гарч мэднэ. Энэ үед маш их цаг хүч шаардагддаг.
