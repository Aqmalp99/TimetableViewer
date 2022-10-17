import React from 'react';

function Alert_boot(props) {
    return (
        props.alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>{props.alert.type}</strong>: {props.alert.msg}
            {/* <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button> */}
        </div>
    );
}

export default Alert_boot;