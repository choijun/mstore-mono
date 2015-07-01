var Container = React.createClass({
    render: function() {
        return <div className={this.props.cls}>{this.props.children}</div>;
    }
});
var ContainerFluid = React.createClass({
    render: function() {
        return <Container cls={KMS.Dom.mergeCls('container-fluid', this.props.cls)}>
            {this.props.children}
        </Container>;
    }
});
var Row = React.createClass({
    render: function() {
        return <Container cls={KMS.Dom.mergeCls('row', this.props.cls)}>
            {this.props.children}
        </Container>;
    }
});
var Column = React.createClass({
    render: function() {
        return <Container cls={KMS.Dom.mergeCls('col-sm-' + this.props.colSpan, this.props.cls)}>
            {this.props.children}
        </Container>;
    }
});
var Panel = React.createClass({
    render: function() {
        return <Container cls={KMS.Dom.mergeCls('panel panel-default', this.props.cls)}>
            {this.props.children}
        </Container>;
    }
});
var PanelHeader = React.createClass({
    render: function() {
        return <Container cls={KMS.Dom.mergeCls('panel panel-heading', this.props.cls)}>
            {this.props.children}
        </Container>;
    }
});
var PanelBody = React.createClass({
    render: function() {
        return <Container cls={KMS.Dom.mergeCls('panel panel-body', this.props.cls)}>
            {this.props.children}
        </Container>;
    }
});
var PanelFooter = React.createClass({
    render: function() {
        return <Container cls={KMS.Dom.mergeCls('panel panel-footer', this.props.cls)}>
            {this.props.children}
        </Container>;
    }
});

var Icon = React.createClass({
    render: function() {
        return <span className={'glyphicon glyphicon-' + this.props.type} aria-hidden="true" onClick={this.props.onClick}></span>;
    }
});
var Button = React.createClass({
    render: function() {
        return <button type="button" className={KMS.Dom.mergeCls('btn btn-sm btn-' + this.props.type, this.props.cls)} onClick={this.props.onClick}>
            {this.props.icon ? <Icon type={this.props.icon} /> : ''}
            {this.props.text}
        </button>;
    },
    getDefaultProps: function() {
        return { type: 'default' };
    }
});
var Link = React.createClass({
    render: function() {
        return <a href={this.props.path} className={this.props.cls} onClick={this.props.onClick}>
            {this.props.icon ? <Icon type={this.props.icon} /> : ''}
            {this.props.text}
            {this.props.children}
        </a>;
    },
    getDefaultProps: function() {
        return { path: 'javascript:void(0)' };
    }
});

var Table = React.createClass({
    render: function() {
        return <table className={KMS.Dom.mergeCls('table table-striped table-hover', this.props.cls)}>
            {this.props.children}
        </table>;
    }
});

var DialogPopup = React.createClass({
    render: function() {
        return <div className={KMS.Dom.mergeCls('modal fade', this.props.cls)} id={this.props.id} tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
});
var PopupHeader = React.createClass({
    render: function() {
        return <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">{this.props.title}</h4>
        </div>;
    }
});