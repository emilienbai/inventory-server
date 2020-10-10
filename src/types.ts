const TYPES = {
    IAuthController: Symbol.for("AuthController"),
    IAuthorController: Symbol.for("AuthorController"),
    IItemController: Symbol.for('ItemController'),

    IIndexRouter: Symbol.for('IndexRouter'),
    IAuthorRouter: Symbol.for("AuthorRouter"),
    IItemRouter: Symbol.for("ItemRouter"),
};

export { TYPES };