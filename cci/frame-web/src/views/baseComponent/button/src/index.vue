<template>
  <div class="page-demo">
    <CodeBox title="正常状态">
      <c-button type="primary">
        主要按钮
      </c-button>
      <c-button>次要按钮</c-button>
      <c-button type="danger">
        危险按钮
      </c-button>
      <c-button type="card">
        地图按钮
      </c-button>
    </CodeBox>
    <CodeBox title="禁用状态">
      <c-button type="primary" disabled>
        主要按钮
      </c-button>
      <c-button disabled>
        次要按钮
      </c-button>
      <c-button type="danger" disabled>
        危险按钮
      </c-button>
      <c-button type="card" disabled>
        地图按钮
      </c-button>
    </CodeBox>
    <CodeBox title="不同尺寸">
      <c-button type="primary">
        默认尺寸
      </c-button>
      <c-button type="primary" size="medium">
        大尺寸（medium）
      </c-button>
      <c-button type="primary" size="small">
        中尺寸（small）
      </c-button>
      <c-button type="primary" size="mini">
        小尺寸（mini）
      </c-button>
    </CodeBox>
    <CodeBox title="图标按钮">
      <c-button icon="el-icon-search" class="square" />
      <c-button type="danger" class="square">
        <i class="el-icon-delete" />
      </c-button>
      <c-button
        type="danger"
        icon="el-icon-delete"
        class="square"
        size="mini"
      />
      <c-button
        type="primary"
        icon="el-icon-edit"
        class="square"
        size="medium"
      />
      <c-button
        type="info"
        icon="el-icon-message"
        class="square"
        size="small"
      />
      <c-button
        type="danger"
        icon="el-icon-delete"
        class="square"
        size="mini"
      />
    </CodeBox>
  </div>
</template>
