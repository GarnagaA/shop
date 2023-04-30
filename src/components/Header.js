function Header (props) {
    const {onDrawer} = props

    return (
        <header className="d-flex justify-between p-40 align-center">
            <div className="d-flex justify-center">
                <img width={40} height={40} src= '/img/logo.png' alt='Логотип компании' />
                <div>
                    <h3>React-test</h3>
                    <p className='opacity-5'>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className='d-flex'>
                <li className='mr-30'>
                    <img onClick={onDrawer} width={18} height={18} src='/img/cart.svg' alt='cart'/>
                    <span className='ml-5'>1205 руб.</span>
                </li>
                <li>
                    <img width={18}  height={18} src='/img/user.svg' alt='user'/>
                </li>
            </ul>
        </header>
    )
}

export default Header;