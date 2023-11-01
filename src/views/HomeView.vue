<script>
import headerVue from '../components/header.vue'
import footerVue from '../components/footer.vue'
import axios from 'axios'
export default {
  data() {
    return {
      products: []
    }
  },
  components: {
    headerVue,
    footerVue
  },
  methods: {
    // Hàm lấy ngẫu nhiên một số từ một khoảng giá trị
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    // Hàm lấy ngẫu nhiên 3 sản phẩm từ danh sách sản phẩm
    getRandomProducts(products) {
      const randomizedProducts = []
      const numProducts = products.length

      // Kiểm tra nếu danh sách sản phẩm ít hơn 3 thì trả về toàn bộ danh sách
      if (numProducts <= 3) {
        return products
      }

      // Lấy ngẫu nhiên 3 chỉ số sản phẩm trong danh sách
      const randomIndexes = new Set()
      while (randomIndexes.size < 3) {
        randomIndexes.add(this.getRandomNumber(0, numProducts - 1))
      }

      // Lấy sản phẩm tương ứng với các chỉ số ngẫu nhiên
      randomIndexes.forEach((index) => {
        randomizedProducts.push(products[index])
      })

      return randomizedProducts
    },
    // Phương thức hiển thị danh sách sản phẩm
    async showAll() {
      try {
        // Lấy danh sách sản phẩm từ API
        const productsResponse = await axios.get('http://localhost:3000/product/home')
        const allProducts = productsResponse.data

        // Lấy ngẫu nhiên 3 sản phẩm từ danh sách sản phẩm
        const randomProducts = this.getRandomProducts(allProducts)

        // Gán danh sách sản phẩm ngẫu nhiên vào biến products
        this.products = randomProducts

        // Lấy danh sách ảnh sản phẩm từ API
        const imagesResponse = await axios.get('http://localhost:3000/product/img')
        const images = imagesResponse.data

        // Gán danh sách ảnh sản phẩm cho từng sản phẩm
        this.products.forEach((product) => {
          const productImages = images.filter((img) => img.nameProduct === product._id)
          product.images = productImages
        })

        console.log(this.products)
      } catch (err) {
        console.log(err)
      }
    }
  },
  mounted() {
    this.showAll()
  }
}
</script>

<template>
  <headerVue></headerVue>
  <main class="col-main">
    <div class="container">
      <div class="carousel p-5">
        <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div class="carousel-inner carousel-top">
            <div class="carousel-item active">
              <img
                src="public/img/carousel/open.png"
                class="d-block"
                alt="..."
                style="width: 100%; height: 100%"
              />
            </div>
            <div class="carousel-item">
              <img
                src="public/img/carousel/Bobambo-1.png"
                class="d-block"
                alt="..."
                style="width: 100%; height: 100%"
              />
            </div>
            <div class="carousel-item">
              <img
                src="public/img/carousel/Bobambo-2.png"
                class="d-block"
                alt="..."
                style="width: 100%; height: 100%"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

    <p class="local-name">BoBamBu</p>
    <div class="container">
      <div class="row d-flex product-1">
        <div class="col-md-6 col-lg-6 col-xl-4 col-xxl-4 img_p1">
          <img src="public/img/product/Demo.png" alt="" style="width: 100%" />
        </div>
        <div class="col-md-6 col-xl-8 col-lg-6 col-xxl-8 text_p1">
          <p class="text_main1">
            Trà sữa - Kết hợp tinh tế giữa trà thơm và sữa béo, mang đến một trải nghiệm hương vị
            tuyệt vời, đậm đà, ngọt ngào. Hãy thưởng thức một ly trà sữa thơm phức, mịn màng, cùng
            những hạt trân châu tròn trịa, thỏa sức thưởng thức những khoảnh khắc thư giãn trọn vẹn.
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row d-flex">
        <div class="col-sm-0 col-md-4 -col-lg-4">
          <img src="public/img/product/Tra-Xanh-Dao.png" alt="" style="width: 100%" />
        </div>
        <div class="col-sm-12 col-md-4 -col-lg-4 mt-5 text_p2">
          <p>
            Trà- Hòa quyện hương vị trà oolong thơm ngọt và sự mềm mịn của thạch, mang đến một trải
            nghiệm độc đáo. Hòa quyện giữa vị chát nhẹ của trà và độ ngọt của thạch, tạo nên một cảm
            giác hài hòa trên đầu lưỡi. Thưởng thức trà oolong có thạch, bạn sẽ cảm nhận được sự hài
            lòng và thỏa mãn với một ly trà độc đáo, ngon lành.
          </p>
          <p>
            Trà trái cây - Hòa quyện hương vị tươi ngon của trái cây, mang đến một ly trà tươi mát
            đầy sức sống. Với sự kết hợp độc đáo của trà và trái cây, mỗi ngụm trà trái cây là một
            hành trình thưởng thức hương vị đa dạng từ chanh, dứa, mâm xôi đến dâu tây, xoài. Thưởng
            thức trà trái cây, bạn sẽ cảm nhận được sự tươi mới, sảng khoái và đầy hứng khởi cho
            ngày mới.
          </p>
        </div>

        <div class="col-sm-0 col-md-4 -col-lg-4">
          <img src="public/img/product/TRA-NHO.png" alt="" style="width: 100%" />
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row d-flex product_3">
        <div class="col-md-8 col-xl-8 col-xxl-8 text_p3">
          <p>
            Sữa tươi chân châu đường đen - Kết hợp hài hòa giữa kem sữa tươi mềm mịn và viên chân
            châu đường đen thơm ngon. Một tách sữa tươi chân châu đường đen là sự kết hợp tuyệt vời
            của vị ngọt, mát lạnh và đậm đà. Thưởng thức ly sữa tươi chân châu đường đen, bạn sẽ
            trải nghiệm hương vị độc đáo, từ sự béo ngậy của sữa tươi đến độ dai và ngọt ngào của
            chân châu đường đen, mang đến một trải nghiệm thưởng thức đầy thú vị.
          </p>
        </div>
        <div class="col-md-4 col-xl-4 col-xxl-4 img_p3">
          <img src="public/img/product/sua_tuoi.png" style="width: 100%" alt="" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row flex mt-4">
        <div class="col-md-4 col-xl-4 col-xxl-4 img_p4">
          <img src="public/img/product/dau-socola-da-xay.png" style="width: 100%" alt="" />
        </div>
        <!-- <div class="col-2"></div> -->
        <div class="col-md-8 col-xl-8 col-xxl-8">
          <p class="text_p4" style="text-align: center">
            Smoothie Series:một thức uống đá được xay nhuyễn kết hợp và kết hợp với các thành phần
            khác. Sự pha trộn đặc sắc này tạo ra một thức uống mát lạnh, bổ dưỡng và thơm ngon. Sinh
            tố xoay mang đến cảm giác sảng khoái và ngọt ngào từ hương vị tự nhiên của các loại hoa
            quả. Nó là một lựa chọn tuyệt vời để tận hưởng hương vị và cung cấp dưỡng chất cho cơ
            thể.
          </p>
        </div>
      </div>
    </div>

    <p class="local-name">Gợi Ý Một Vài Sản Phẩm</p>
    <div class="container">
      <div class="row">
        <div class="col" v-for="product in products" :key="product._id">
          <div class="row product-seller">
            <router-link :to="'/products/' + product._id">
              <img
                v-for="image in product.images"
                :key="image._id"
                :src="'/public/img/products/' + image.name"
                style="width: 100%; height: 100%"
                alt=""
              />

            </router-link>
            <p class="name-product-seller">{{ product.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <p class="local-name">Local</p>

    <div class="container">
      <div class="home-content row d-flex">
        <div class="col-md-6 local-home">
          <div class="row d-block">
            <div class="col-md-12 mb-4">
              <img
                class="img-1"
                src="public/img/local/DD1.jpg"
                style="width: 100%; height: 100%"
                alt=""
              />
            </div>
            <div class="col-md-12">
              <img
                class="img-2"
                src="public/img/local/DD2.jpg"
                style="width: 100%; height: 100%"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="col-md-6 local-home">
          <div class="row d-block">
            <div class="col-md-12 mb-4">
              <img
                class="img-3"
                src="public/img/local/DD-3.jpg"
                style="width: 100%; height: 100%"
                alt=""
              />
            </div>
            <div class="col-md-12">
              <img
                class="img-4"
                src="public/img/local/DD4.jpg"
                style="width: 100%; height: 100%"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footerVue></footerVue>
</template>

<style>
.col-main {
  background-color: #2f6451;
  /* background: url('/public/img/header/nen.png') top center / cover no-repeat; */
}

.row-3 {
  display: flex;
  padding-bottom: 15px;
}
.row-4 {
  height: auto;
}
.row-5 {
  height: auto;
}
/* carousel */

/* local */
.local-name {
  margin-top: 5px;
  background-color: rgb(19, 25, 35);
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 25px;
  font-weight: 100;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  border: #ffffff solid;
}

.img-local {
  background-color: rgb(0, 0, 0);
  border-radius: 10px;
}

/* product introduce */
.product-1 {
  background-color: #d9edc7;
  border-radius: 250px;
}

.text_main1 {
  /* background-color: rgb(46, 150, 108); */
  color: #000000;
  margin-top: 150px;
  margin-bottom: 90px;
  margin-left: 25px;
  margin-right: 50px;
  /* padding: 100px; */
  text-align: center;
  border-radius: 50%;
  font-size: 1.2rem;
}
@media screen and (max-width: 768px) {
  .img_p1 {
    width: 100%;
  }
  .text_main1 {
    margin-top: -25px;
  }
}
.text_p2 {
  color: #ffffff;
}
.product_3 {
  border: rgba(0, 0, 0, 0.521) solid 5px;
  border-radius: 25px;
  /* box-shadow: 0px 0px 50px rgba(225, 210, 210, 0.5); */
  background-color: #d5c49ec9;
}
.img_p3 {
  /* background-color: #000000; */
  border-radius: 100%;
  padding: 0;
}
.text_p3 {
  margin-top: 150px;
  margin-bottom: 55px;
  background-color: rgba(160, 102, 21, 0.486);
  height: fit-content;
  color: #ffffff;
  padding: 15px;
  border-radius: 25px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5);
  /* margin-left: 25px; */
}
@media screen and (max-width: 768px) {
  .img_p3 {
    margin-top: -50px;
    width: 100%;
  }
  .text_p3 {
    margin-top: 25px;
  }
}
.img_p4 {
  background-color: #000000c1;
  border-radius: 50px;
}
.text_p4 {
  color: #ffffff;
  margin-top: 150px;
}
@media screen and (max-width: 768px) {
  .img_p4 {
    width: 100%;
  }
  .text_p4 {
    margin-top: 25px;
  }
}

/* product best seller */
.name-product-seller {
  text-align: center;
  color: #ffffff;
}
.product-seller img:hover {
  margin: -15px;
}
.local-home img {
  border-radius: 25px;
  margin-bottom: 25px;
}
.local-home img:hover {
  content: 'shadyu';
  /* position: absolute; */

  background: #000;
  padding: 5px;
}
</style>
