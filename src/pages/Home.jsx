import Search from "../components/Search";
import Card from "../components/Card";
import {useContext} from "react";
import AppContext from "../components/context";

// const sneakers = [
//     {
//         "parentId": "54324",
//         "title": "Кроссовки Invisible White Black | BLAZE-BY",
//         "price": "9990",
//         "imageUrl": "https://www.footlocker.com.eg/assets/styles/FootLocker/image-thumb__57780__product_zoom_large_800x800/314205222004_01.jpg"
//     },
//     {
//         "parentId": "38166",
//         "title": "Кроссовки Nike Dunk Low Retro White Black | BLAZE-BY",
//         "price": "9990",
//         "imageUrl": "https://i.ebayimg.com/00/s/MTAwMFgxMDAw/z/4NYAAOSwrUNgWKva/$_58.png"
//     },
//     {
//         "parentId": "37463",
//         "title": "Nike M2K Tekno",
//         "price": "32200",
//         "imageUrl": "https://m2k.com.ua/image/cache/catalog/m2kphoto/black_team_orange/krossovki_nike_m2k_tekno_black_team_orange_ao3108_101_1-500x500-product_list.jpg"
//     },
//     {
//         "parentId": "23931",
//         "title": "Nike Air Force 1 07 QS Valentines Day Love Letter",
//         "price": "20100",
//         "imageUrl": "https://myreact.ru/wp-content/uploads/2021/04/Nike-Air-Force-1-Low-Valentines-Day-DD3384-600-Release-Date-2.jpg"
//     },
//     {
//         "parentId": "394023",
//         "title": "Кроссовки Nike Air 200",
//         "price": "10700",
//         "imageUrl": "https://ir.ozone.ru/s3/multimedia-z/c1000/6383869691.jpg"
//     },
//     {
//         "parentId": "29582",
//         "title": "Кроссовки Nike Elephant One",
//         "price": "21990",
//         "imageUrl": "https://cdn.shopify.com/s/files/1/0598/3669/4689/products/77338-116-original_800x_1e32a3fb-2855-4078-b297-742815405dde_1800x1800.png?v=1657936107"
//     },
//     {
//         "parentId": "48232",
//         "title": "Кроссовки Nike Model 69",
//         "price": "10700",
//         "imageUrl": "https://static.tildacdn.com/tild3638-3866-4132-b833-643132653638/12.jpg"
//     },
//     {
//         "parentId": "193753",
//         "title": "Yeezy Boost 350 V2 Black (Non-Reflective)",
//         "price": "10230",
//         "imageUrl": "https://www.footlocker.com.eg/assets/styles/FootLocker/image-thumb__127613__product_zoom_large_800x800/314215228504_01.jpg"
//     },
//     {
//         "parentId": "5873732",
//         "title": "Air Jordan 1 Retro High Hyper Royal",
//         "price": "10400",
//         "imageUrl": "https://www.footlocker.com.eg/assets/styles/FootLocker/image-thumb__123227__product_zoom_large_800x800/314214700404_01.jpg"
//     }
// ]
function Home({
        setSearchValue,
        searchValue,
  }) {
    const {items, isLoading} =useContext(AppContext)
    const renderItems = () => {

        const filteredItems = items.filter(obj =>
            obj.title.toLowerCase().includes(searchValue.toLowerCase())
        );

        return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
                <Card
                    key={index}
                    {...item}
                />
        ))
    };

    return (
        <div className="content2 p-40">
            <Search setSearchValue={setSearchValue} searchValue={searchValue}/>
            <ul className='d-flex flex-wrap'>
                {renderItems()}
            </ul>
        </div>
    )
}
export default Home;