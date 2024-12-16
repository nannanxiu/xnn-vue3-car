<template>
    <div class="content-container">
        <!-- 第一块：监测类型 -->
        <div class="section">
            <h2 class="section-title">{{ $t('message.tit1') }}</h2>
            <div class="section-content">
                <div class="item">
                    <h3>{{ $t('message.tit2') }}</h3>
                    <p>{{ $t('message.tit21') }}</p>
                </div>
                <div class="item">
                    <h3>{{ $t('message.tit3') }}</h3>
                    <p>{{ $t('message.tit31') }}</p>
                </div>
                <div class="item">
                    <h3>{{ $t('message.tit4') }}</h3>
                    <p>{{ $t('message.tit41') }}</p>
                </div>
                <div class="item">
                    <h3>{{ $t('message.tit5') }}</h3>
                    <p>{{ $t('message.tit51') }}</p>
                </div>
            </div>
        </div>

        <!-- 第二块：常用仪器和技术 -->
        <div class="section">
            <h2 class="section-title">常用仪器和技术</h2>
            <div class="section-content">
                <div class="item">
                    <h3>测量仪器</h3>
                    <p>全站仪、水准仪、GPS 接收机等，用于测量结构的位移、沉降、坐标等几何参数。</p>
                </div>
                <div class="item">
                    <h3>传感器技术</h3>
                    <p>应变片、应力计、加速度计、倾角仪等传感器，可实时感知结构的物理量变化。</p>
                </div>
                <div class="item">
                    <h3>数据采集与传输</h3>
                    <p>采用数据采集仪进行实时采集和存储，通过通信技术将数据传输至监控中心。</p>
                </div>
                <div class="item">
                    <h3>数据处理与分析</h3>
                    <p>利用专业软件进行数据处理和分析，实现对施工过程的实时评估和预测。</p>
                </div>
            </div>
        </div>

        <!-- 第三块：实施流程 -->
        <div class="section">
            <h2 class="section-title">实施流程</h2>
            <div class="section-content">
                <div class="process-flow">
                    <div class="process-item">
                        <div class="step">1</div>
                        <h3>监测方案设计</h3>
                        <p>制定详细的监测方案，包括监测内容、监测点布置等。</p>
                    </div>
                    <div class="process-item">
                        <div class="step">2</div>
                        <h3>设备安装调试</h3>
                        <p>安装各种监测仪器设备，并进行调试和校准。</p>
                    </div>
                    <div class="process-item">
                        <div class="step">3</div>
                        <h3>数据采集传输</h3>
                        <p>按规定频率进行数据采集并传输至监控中心。</p>
                    </div>
                    <div class="process-item">
                        <div class="step">4</div>
                        <h3>数据处理分析</h3>
                        <p>处理分析监测数据，生成监测报表和曲线。</p>
                    </div>
                    <div class="process-item">
                        <div class="step">5</div>
                        <h3>预警与反馈</h3>
                        <p>设定预警值，及时发出预警信号并反馈。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content-container {
    padding: 20px;
    background: #f5f7fa;
}

.section {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.section-title {
    color: #303133;
    font-size: 24px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #409EFF;
}

.section-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}

.item {
    padding: 15px;
    border-radius: 8px;
    background: #f8faff;
    border: 1px solid #e8f2ff;
    transition: all 0.3s ease;
}

.item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item h3 {
    color: #409EFF;
    margin-bottom: 10px;
}

.item p {
    color: #606266;
    line-height: 1.6;
}

.process-flow {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-around;
}

.process-item {
    flex: 1;
    min-width: 200px;
    text-align: center;
    padding: 15px;
    position: relative;
}

.step {
    width: 40px;
    height: 40px;
    line-height: 40px;
    background: #409EFF;
    color: white;
    border-radius: 50%;
    margin: 0 auto 15px;
    font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .section-content {
        grid-template-columns: 1fr;
    }
    
    .process-item {
        flex: 100%;
    }
}
</style>