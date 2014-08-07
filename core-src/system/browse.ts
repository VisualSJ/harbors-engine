module harbors{

    enum type{
        chrome, firefox, safari,
        ie, opera, other
    }

    enum language{
        english, chinese, french,
        italian, german, spanish,
        russian, korean
    }

    export module browse {
        export var type: string;
        export var version: string;
    }

}